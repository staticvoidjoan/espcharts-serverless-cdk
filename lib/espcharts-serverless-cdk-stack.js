const cdk = require("aws-cdk-lib");
const { Construct } = require("constructs");
const { Stack, Duration } = require("aws-cdk-lib");
// const sqs = require('aws-cdk-lib/aws-sqs');

const apigateway = require("aws-cdk-lib/aws-apigateway");
const path = require("path");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");

class EspchartsServerlessCdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const cognitoPool = props.cognitoPool;
    console.log(
      "Cognito Pool in EspchartsServerlessCdkStack:",
      props.cognitoPool
    );
    console.log(
      "User Pool ARN in EspchartsServerlessCdkStack:",
      props.cognitoPool.userpool.userPoolArn
    );

    // Player Functions  --------------------------------
    const getAllPlayersFunction = new NodejsFunction(
      this,
      "GetAllPlayersFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        entry: path.join(__dirname, "../resources/players/GetAll.js"),
        handler: "handler",
      }
    );

    const getPlayerById = new NodejsFunction(this, "GetPlayerById", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/players/GetById.js"),
      handler: "handler",
    });

    const getPaginatedPlayers = new NodejsFunction(
      this,
      "GetPaginatedPlayers",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        entry: path.join(__dirname, "../resources/players/GetPages.js"),
        handler: "handler",
      }
    );

    const createPlayer = new NodejsFunction(this, "CreatePlayer", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/players/Post.js"),
      handler: "handler",
    });

    const editPlayer = new NodejsFunction(this, "EditPlayer", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/players/Update.js"),
      handler: "handler",
    });

    const deletePlayer = new NodejsFunction(this, "DeletePlayer", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/players/Delete.js"),
      handler: "handler",
    });

    //Team Functions  --------------------------------
    const getAllTeamsFunction = new NodejsFunction(
      this,
      "GetAllTeamsFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        entry: path.join(__dirname, "../resources/Teams/GetAll.js"),
        handler: "handler",
      }
    );

    const getTeamById = new NodejsFunction(this, "GetTeamById", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/Teams/GetById.js"),
      handler: "handler",
    });

    const getPaginatedTeams = new NodejsFunction(this, "GetPaginatedTeams", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/Teams/GetPages.js"),
      handler: "handler",
    });

    const createTeam = new NodejsFunction(this, "CreateTeam", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/Teams/Post.js"),
      handler: "handler",
    });

    const editTeam = new NodejsFunction(this, "EditTeam", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/Teams/Update.js"),
      handler: "handler",
    });

    const deleteTeam = new NodejsFunction(this, "DeleteTeam", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/Teams/Delete.js"),
      handler: "handler",
    });

    //Tournament Functions --------------------------------
    const getAllTournaments = new NodejsFunction(this, "GetAllTournaments", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/Tournament/GetAll.js"),
      handler: "handler",
    });

    const getTournamentById = new NodejsFunction(this, "GetTournamentById", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/Tournament/GetById.js"),
      handler: "handler",
    });

    const getPaginatedTournaments = new NodejsFunction(
      this,
      "GetPaginatedTournaments",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        entry: path.join(__dirname, "../resources/Tournament/GetPages.js"),
        handler: "handler",
      }
    );

    const createTournaments = new NodejsFunction(this, "CreateTournaments", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/Tournament/Post.js"),
      handler: "handler",
    });

    const editTournaments = new NodejsFunction(this, "EditTournaments", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/Tournament/Update.js"),
      handler: "handler",
    });

    const deleteTournaments = new NodejsFunction(this, "DeleteTournaments", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../resources/Tournament/Delete.js"),
      handler: "handler",
    });

    // Define the API gateway
    const api = new apigateway.RestApi(this, "Api", {
      restApiName: "espcharts-api-cdk",
      description: "ESPCHARTS API FROM CDK",
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Authorization"],
      },
    });
    console.log(props.cognitoPool.userpool);
    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(
      this,
      "MyAuthorizer",
      {
        cognitoUserPools: [props.cognitoPool.userpool],
        identitySource: "method.request.header.Authorization",
      }
    );

    //Players API ----------------------------------------------------------------
    const customResource = new apigateway.Resource(this, "CustomResource", {
      parent: api.root,
      pathPart: "espcharts",
    });
    const playerResource = new apigateway.Resource(this, "PlayersResource", {
      parent: customResource,
      pathPart: "players",
    });
    const allPlayerResource = new apigateway.Resource(
      this,
      "AllPlayersResource",
      {
        parent: customResource,
        pathPart: "allPlayers",
      }
    );
    const playerIdResource = playerResource.addResource("{playerId}"); // {playerId} is a placeholder for the player's unique ID

    playerResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getPaginatedPlayers),
      {
        authorizer: authorizer,
      }
    );

    allPlayerResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getAllPlayersFunction),
      {
        authorizer: authorizer,
      }
    );

    playerIdResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getPlayerById),
      {
        authorizer: authorizer,
      }
    );
    playerResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(createPlayer),
      {
        authorizer: authorizer,
      }
    );
    playerIdResource.addMethod(
      "PUT",
      new apigateway.LambdaIntegration(editPlayer),
      {
        authorizer: authorizer,
      }
    );
    playerIdResource.addMethod(
      "DELETE",
      new apigateway.LambdaIntegration(deletePlayer),
      {
        authorizer: authorizer,
      }
    );

    //Team Api ----------------------------------------------------------------
    const teamResource = new apigateway.Resource(this, "TeamsResource", {
      parent: customResource,
      pathPart: "teams",
    });
    const teamIdResource = teamResource.addResource("{teamId}");

    teamResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getAllTeamsFunction),
      {
        authorizer: authorizer,
      }
    );
    teamIdResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getTeamById),
      {
        authorizer: authorizer,
      }
    );
    teamResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(createTeam),
      {
        authorizer: authorizer,
      }
    );
    teamIdResource.addMethod("PUT", new apigateway.LambdaIntegration(editTeam),
    {
      authorizer: authorizer,
    });
    teamIdResource.addMethod(
      "DELETE",
      new apigateway.LambdaIntegration(deleteTeam),
      {
        authorizer: authorizer,
      }
    );
    //Team Api ----------------------------------------------------------------
    const tournamentResource = new apigateway.Resource(
      this,
      "TournamentResource",
      {
        parent: customResource,
        pathPart: "tournament",
      }
    );
    const tournamentIdResource =
      tournamentResource.addResource("{tournamentId}");

    tournamentResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getAllTournaments),
      {
        authorizer: authorizer,
      }
    );
    tournamentIdResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getTournamentById),
      {
        authorizer: authorizer,
      }
    );
    tournamentResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(createTournaments),
      {
        authorizer: authorizer,
      }
    );
    tournamentIdResource.addMethod(
      "PUT",
      new apigateway.LambdaIntegration(editTournaments),
      {
        authorizer: authorizer,
      }
    );
    tournamentIdResource.addMethod(
      "DELETE",
      new apigateway.LambdaIntegration(deleteTournaments),
      {
        authorizer: authorizer,
      }
    );
  }
}

module.exports = { EspchartsServerlessCdkStack };
