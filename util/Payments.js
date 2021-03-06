/** Payments Module */

const fs = require('fs');
const request = require('request');
const crypto = require('crypto');

const Database = require('./Database').firestore;
const ServerConfig = require('../config.json');

const env = require('../config.json').payments.env;
const { API_KEY, AUTH_TOKEN } = require('../config.json').payments[env];

function registerNewTxn (params) {
    let txnID = 'TXN', sum=0
    let pos = Math.floor( Math.random()*20 )
    for(let i=0; i<20; i++) {
        let digit = Math.floor( Math.random()*10 )
        if(i===pos)
            digit = '__'
        else
            sum += digit

        txnID += digit
    }
    
    let mod = 11 - (sum % 11)
    digit = Math.floor( Math.random()*mod )
    txnID = txnID.replace(/__/, digit.toString() + (mod-digit).toString())

    return new Promise((resolve,reject)=>{
        Database.collection('transactions').doc(txnID).set({
                status: 'CREATED',
                txnID: txnID,
                addedOn: (new Date()).getTime(),
                payer: params.payer,
                amount: {
                    base: params.amount.base,
                    tax: parseFloat(params.amount.tax),
                    total: parseFloat(params.amount.total)
                },
                eventData: params.eventData,
                verified: false
            }).then(()=>{
                resolve(txnID)
            }).catch((err)=>{
                reject('ERR_DB DatabaseError')
            })
    })
}

exports.CreateNewPayment = (params) => {
    return new Promise((resolve,reject)=>{
        registerNewTxn(params).then((txnId)=>{
            request.post('https://test.instamojo.com/api/1.1/payment-requests/', {
                headers : {
                    'X-Api-Key': API_KEY,
                    'X-Auth-Token': AUTH_TOKEN
                },
                form : {
                    purpose: params.eventData.title,
                    amount: params.amount.total,
                    phone: params.payer.phone,
                    buyer_name : params.payer.name,
                    redirect_url: 'https://xtacy.org/register/payment',
                    webhook: 'https://xtacy.org/_payment/webhook/',
                    email: params.payer.email,
                    allow_repeated_payments: false,
                    // expire_at: 10 mins
                }
            }, function(err, res, body)
                {          
                    if(err) reject(err)
                    if(res.statusCode===201 && body!==null) {
                        var responseData = JSON.parse(body)
                        Database.collection('transactions').doc(txnId).set({
                            txnId: txnId,
                            paymentId: '',
                            paymentRequestId: responseData.payment_request.id,
                            amount: responseData.payment_request.amount,
                            purpose: responseData.payment_request.purpose,
                            name: responseData.payment_request.buyer_name,
                            email: responseData.payment_request.email,
                            phone: responseData.payment_request.phone,
                            status: responseData.payment_request.status,
                            createdAt: responseData.payment_request.created_at,
                            modifiedAt: responseData.payment_request.modified_at
                        }).then(()=>{
                            resolve({
                                hash : crypto.createHmac('sha256', ServerConfig.clientKey).update(JSON.stringify(responseData.payment_request)).digest('hex'),
                                payment: responseData.payment_request,
                                txnId: txnId,
                                success: responseData.success
                            })
                        })
                    } else {
                        reject({ status: false })
                    }
                }
            )
        })
    })
}