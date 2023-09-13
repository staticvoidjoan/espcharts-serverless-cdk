const { Construct } = require("constructs");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const lambda = require("aws-cdk-lib/aws-lambda");
const s3 = require("aws-cdk-lib/aws-s3");

class LambdaService extends Construct {
    constructor(scope, id){
        super(scope, id);

        // ... Other code ...

        // Get AllPlayer Function
        const getAllPlayersFunction = new lambda.Function(this, "GetAllPlayersFunction",{
            runtime: lambda.Runtime.NODEJS_18_X,
            code: lambda.Code.fromAsset("resources" ),
            handler: "Players/GetAll.handler",
        });

        // Define the API gateway
        const api = new apigateway.RestApi(this, 'Api',{
            restApiName: 'espcharts-api-cdk',
            description: "ESPCHARTS API FROM CDK",
            defaultCorsPreflightOptions: {
                allowOrigins: ['*'],
                allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowHeaders: ['Authorization'],
            },
        });

        const customResource = new apigateway.Resource(this, 'CustomResource', {
            parent: api.root,
            pathPart: 'espcharts',
        });
//k;lkl
        const playerResource = new apigateway.Resource(this, 'PlayersResource', {
            parent: customResource,
            pathPart: 'players',
        });
        playerResource.addMethod('GET', new apigateway.LambdaIntegration(getAllPlayersFunction));
    }
}

module.exports = { LambdaService }
