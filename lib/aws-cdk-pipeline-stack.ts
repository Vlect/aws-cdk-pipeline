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
  }
}
