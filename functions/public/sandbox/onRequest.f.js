const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const { ethers } = require("@dhedge/v2-sdk");
const _ = require('lodash');
const helpers = require('../../libs/helpers');
const btcSuperYield = require('../../libs/strategies/btcSuperYield');
const dhedge = require('../../libs/dhedge');
const coinmarketcap = require('../../libs/coinmarketcap');
const delay = require('delay');
const zapper = require('../../libs/zapper');
const aave = require('../../libs/aave');

/**
 * Authenticated Hello World test
 */
exports = module.exports = functions
    .runWith({
        // Ensure the function has enough memory and time to process
        timeoutSeconds: 400,
        memory: "2GB",
        secrets: [
            "API_KEY", 
            "MNEMONIC", 
            "PROVIDER",
            "POOL_ADDRESS",
            "COIN_MARKET_CAP_API_KEY",
            "ZAPPER_API_KEY",
        ],
    })
    .https
    .onRequest(async (request, response) => {
        cors(request, response, async () => {
            try {
                // Force POST
                if (request.method !== "POST") return helpers.error(response, 400, 
                    "Request method must be POST.");
            
                // Handle Auth
                const { authorization }  = request.headers;
                if (!authorization) return helpers.error(response, 403, 
                    "Unauthorized. A key must be provided in the `authorization` header.");
                
                if (authorization !== process.env.API_KEY) return helpers.error(response, 403, 
                    "Unauthorized. The API key provided is invalid.");
                
                // Authorized!

                // await btcSuperYield.long();
                // const aaveBalances = await zapper.aaveBalances(process.env.POOL_ADDRESS);
                // // helpers.log(aaveBalances);
                // helpers.log(zapper.cleanAaveBalances(aaveBalances));

                // Get the data from the request
                // const { 
                //     memberAddress
                // } = request.body;
                // await dhedge.addMember(memberAddress);
                
                const pool = await dhedge.initPool(
                    process.env.MNEMONIC,
                    process.env.POOL_ADDRESS,
                    'polygon'
                );
                let tokens = await dhedge.getBalances(pool);
                helpers.log(tokens);

                /**
                 * make sure debt is overpaid
                 */
                /**
                 * @TODO Figure out why I'm being auto-liquidated
                 */
                // if (!_.isEmpty(tokens['aave']['variable-debt'])) {
                //     tokens = await aave.reduceDebt(pool, tokens, 1.8);
                //     helpers.log(tokens);
                // }
                
                
                // tokens = await dhedge.withdrawLentTokens(
                //     pool, 
                //     tokens, 
                //     tokens['aave']['supply']['USDC'].address,
                //     1000000,
                // );
                // helpers.log(tokens);
                // // expect usdc in wallet

                // tokens = await dhedge.tradeUniswap(
                //     pool, 
                //     tokens, 
                //     tokens['wallet']['USDC'].address,
                //     dhedge.symbolToAddress('WBTC'),
                //     tokens['wallet']['USDC'].balanceInt,
                // );
                // helpers.log(tokens);
                // // expect no usdc in wallet; some wbtc in wallet

                // tokens = await dhedge.repayDebt(
                //     pool, 
                //     tokens, 
                //     tokens['aave']['variable-debt']['WBTC'].address, 
                //     tokens['aave']['variable-debt']['WBTC'].balanceInt,
                // );
                // helpers.log(tokens);
                // // Expect no debt; some wbtc in wallet
                
                // tokens = await dhedge.withdrawLentTokens(
                //     pool, 
                //     tokens, 
                //     tokens['aave']['supply']['USDC'].address,
                //     tokens['aave']['supply']['USDC'].balanceInt,
                // );
                // helpers.log(tokens);
                // // expect usdc in wallet


                // tokens = await dhedge.lendDeposit(
                //     pool, 
                //     tokens, 
                //     tokens['wallet']['WBTC'].address, 
                //     tokens['wallet']['WBTC'].balanceInt,
                // );
                // helpers.log(tokens);
                // // expect supply wbtc to go up; no wbtc in wallet

                



                // const tx1 = await dhedge.borrowDebt(pool, dhedge.tokens.polygon.USDC.address, '2000000');
                // const tx2 = await dhedge.repayDebt(pool, dhedge.tokens.polygon.USDC.address, '5000000');
                // // helpers.log('Borrowing 0.00005 WBTC');
                // helpers.log(tx1);
                // helpers.log(tx2);
                
                // console.log(dhedge.getBalance(poolInfo, dhedge.tokens.AAVEV3));
                // console.log(await coinmarketcap.btcPrice());

                // helpers.log('Trade WBTC to BTCBULL3X');
                // const tx0 = await dhedge.trade(
                //     dhedge.tokens.WBTC,
                //     dhedge.tokens.BTCBULL3X,
                //     dhedge.getBalance(poolInfo, dhedge.tokens.WBTC),
                //     'TOROS'
                // );
                // helpers.log(tx0);

                // helpers.log('Trade BTCBULL3X to WBTC');
                // const tx0 = await dhedge.trade(
                //     dhedge.tokens.BTCBULL3X,
                //     dhedge.tokens.WBTC,
                //     4400,
                //     'TOROS'
                // );
                // helpers.log(tx0);

                // helpers.log('Pausing for 3 seconds...');
                // await delay(3000);

                
                // const tx1 = await dhedge.lendDeposit(
                //     dhedge.tokens.USDC,
                //     dhedge.getBalance(poolInfo, dhedge.tokens.USDC)
                // );
                // helpers.log('Lend USDC to AAVE');
                // helpers.log(tx1);

                // helpers.log('Pausing for 3 seconds...');
                // await delay(3000);


                // const tx2 = await dhedge.borrowDebt(
                //     dhedge.tokens.WBTC,
                //     await coinmarketcap.btcPrice
                //     dhedge.getBalance(poolInfo, dhedge.tokens.WBTC)
                // );
                // helpers.log('Borrow USCD from AAVE');
                // helpers.log(tx2);
               
                // const tx = await dhedge.lendDeposit(
                //     '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6', 
                //     '0x09c5'
                // );
                // helpers.log(tx);

                // const tx = await dhedge.repayDebt(
                //     '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6', 
                //     '0x1bc182fa01307a40'
                // );
                // helpers.log(tx);



                // const wbtcBalance = dhedge.getBalance(
                //     poolInfo, 
                //     dhedge.tokens.AAVEV3
                // );
                // console.log(wbtcBalance.toString());

                // const tx = await dhedge.withdrawDeposit(
                //     dhedge.tokens.WBTC, 
                //     dhedge.getBalance(
                //         poolInfo, 
                //         dhedge.tokens.AAVEV3
                //     ).div(wbtcBalance)
                // );
                // helpers.log('withdrawDeposit WBTC from AAVE3')
                // helpers.log(wbtcBalance);
                // helpers.log(tx);

                // helpers.log('BTC: ' + await coinmarketcap.btcPrice());
                // helpers.log('ETH: ' + await coinmarketcap.ethPrice());
                // helpers.log('MATIC: ' + await coinmarketcap.maticPrice());

                // Respond
                response.status(200).send({ message: 'Success'});

                // Termininate the function
                return response.end();
            } catch (err) {
                functions.logger.error(err, { structuredData: true });
                return helpers.error(response, 400, err.message);
            }
        })
    });