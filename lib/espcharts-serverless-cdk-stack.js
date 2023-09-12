const { Stack, Duration } = require('aws-cdk-lib');
// const sqs = require('aws-cdk-lib/aws-sqs');
const lambda_service = require('../lib/lambda_service');

class EspchartsServerlessCdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'EspchartsServerlessCdkQueue', {
    //   visibilityTimeout: Duration.seconds(300)
    // });
    new lambda_service.LambdaService(this, 'Lambda_Service',);
  }
}

module.exports = { EspchartsServerlessCdkStack }
