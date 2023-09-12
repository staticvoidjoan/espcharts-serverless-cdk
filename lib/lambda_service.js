const cdk = require("aws-cdk-lib");
const { Construct } = require("constructs");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const lambda = require("aws-cdk-lib/aws-lambda");
const s3 = require("aws-cdk-lib/aws-s3");
class LambdaService extends Construct {
    constructor(scope, id){
        super(scope, id);
     const bucket = new s3.Bucket(this, "LambdaFunctionTestS3")
        // const handler = new lambda.Function(this, "LambdaFunctionTest",{
        //     runtime: lambda.Runtime.NODEJS_18_X,
        //     code: lambda.Code.fromAsset("resources"),
        //     handler: "lambda.handler",
        //     environment: {
        //         BUCKET: bucket.bucketName
        //       }
        // })
        // bucket.grantReadWrite(handler);
        // const api = new apigateway.RestApi(this, "lamdbatest-api",{
        //     restApiName: "lamdbatest-api",
        //     description: "This is a test for the aws cdk "
        // })

        // const getTestIntegration = new apigateway.LambdaIntegration(handler, {
        //     requestTemplates: { "application/json": '{ "statusCode": "200" }' }
        //   });
        //   api.root.addMethod("GET", getTestIntegration); // GET /

        // Get AllPlayer Functiions
        const getAllPlayersFunction = new NodeJSFunction(this, "GetAllPlayersFunction",{
            runtime: lambda.Runtime.NODEJS_18_X,
                code: lambda.Code.fromAsset("resources/Players"),
                handler: "GetAll.handler",
        })




    }
}

module.exports = { LambdaService }