const randomString = require("randomstring");
const request = require('sync-request');
const fs = require("fs");
const path = require('path');

class Vars {
    constructor(){
        this.merchant = "57265";
        this.project = Vars.getNewProjectID();
        this.email= "ttestpublisher@gmail.com";
        this.password= "TestTestTest111";

        this.vc_name = new Date().toISOString();
        this.vc_currency_price = '1' + randomString.generate({length: 11, charset: 'numeric'});
        this.vc_min_purchase_value =  '1' + randomString.generate({length: 4, charset: 'numeric'});
        this.vc_max_purchase_value =  '1' + randomString.generate({length: 11, charset: 'numeric'});
        this.vc_package_sku =  '1' + randomString.generate({length: 11, charset: 'numeric'});
        this.vc_package_description =  '1' + randomString.generate({length: 11, charset: 'numeric'});
        this.vc_package_price =  '1' + randomString.generate({length: 11, charset: 'numeric'});
        this.vc_package_amount =  '1' + this.vc_min_purchase_value;
        this.webhook_url= "https://secure.xsolla.com/api/calc/billing/sample.universal.php";
    }

    static getNewProjectID(){
        let res = request('POST', 'https://api.xsolla.com/merchant/v2/merchants/57265/projects', {
            json: {
                "locale_list":[
                    "en"
                ],
                "name":{
                    "en": new Date().toISOString()
                },
                "keywords":"",
                "payment_url":"",
                "key":"GEtLqMpr4DdAyB3s",
                "ipn_enabled":true,
                "is_cancel_implemented":true,
                "is_external_id_required":false,
                "enabled":false,
                "is_send_email":false,
                "return_url":"",
                "is_sandbox_available":1,
                "users_count":0,
                "cardRecurring":false,
                "descriptor":"",
                "components":{
                    "virtual_currency":{
                        "enabled":false,
                        "custom_name":{

                        }
                    },
                    "items":{
                        "enabled":false,
                        "custom_name":{

                        }
                    },
                    "subscriptions":{
                        "enabled":false,
                        "custom_name":{

                        }
                    },
                    "coupons":{
                        "enabled":false,
                        "custom_name":{

                        }
                    },
                    "game_delivery":{
                        "enabled":false,
                        "custom_name":{

                        }
                    },
                    "simple_checkout":{
                        "enabled":false,
                        "custom_name":{

                        }
                    }
                },
                "user_billing_enabled":false,
                "show_user_in_paystation":false,
                "send_json_to_paystation":false,
                "user_public_id_enabled":false,
                "autoredirect_from_status_page":"none",
                "autoredirect_from_status_page_in_seconds":0,
                "status_page_show_return_to_game_link":"done",
                "status_page_return_to_game_link_name":{

                },
                "xsolla_tips_enabled":null,
                "url":"https://xsolla.slack.com/messages/D9GP784TE/details/#",
                "img":null
            },
            headers: {"Authorization":"Basic NTcyNjU6a2tra2tra2tra2tr"}
        });
        let projectObj = JSON.parse(res.getBody('utf8'));
        console.log("Current project is " + projectObj.id);
        return projectObj.id
    }
}

const root = path.join(process.env.OLDPWD + '/tmp/vars.json');
const vars = new Vars();

fs.writeFile(root, JSON.stringify(vars, null, 4), (err) => {
    if (err) throw err;
});