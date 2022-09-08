import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { 
  CodePipeline, 
  CodePipelineSource, 
  ShellStep,
  ManualApprovalStep 
} from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';

export class AwsCdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'Testpipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Vlect/aws-cdk-pipeline', 'main'),
        commands: ['npm ci',
                   'npm run build',
                   'npx cdk synth']
      })
    });

    
    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: '064669052383', region: 'us-east-1' },
    }));
    
    testingStage.addPost(new ManualApprovalStep('Manual approval before production'));
    
    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, 'prod', {
      env: { account: '064669052383', region: 'us-east-1' },
    }));

    const pipeline1 = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'Testpipeline1',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('Vlect/aws-cdk-pipeline', 'master', {
          connectionArn: "arn:aws:codestar-connections:us-east-1:064669052383:connection/e7b07f1f-2237-4670-a8eb-aeeff638d610",
          triggerOnPush: true,
        }),
        commands: ['npm ci',
                   'npm run build',
                   'npx cdk synth']
      })
    });

    const testingStage1 = pipeline1.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: '064669052383', region: 'us-east-1' },
    }));

    testingStage1.addPost(new ManualApprovalStep('Manual approval before production'));

    const prodStage1 = pipeline1.addStage(new MyPipelineAppStage(this, 'prod', {
      env: { account: '064669052383', region: 'us-east-1' },
    }));
  }
}
