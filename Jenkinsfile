pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'ujwalnagrikar/my-blue-green-site:latest'
        DOCKERHUB_CREDENTIALS = 'dockerhub-pass'
        DOCKER_USERNAME = 'ujwalnagrikar'
        K8S_NAMESPACE = 'default'
        K8S_DEPLOYMENT_NAME = 'my-blue-green-deployment'
        K8S_SERVICE_NAME = 'my-service'
    }

    stages {

        stage('Clone Repo') {
            steps {
                git(
                    branch: 'main',
                    url: 'https://github.com/UjwalNagrikar/Blue-Green-Deployment-Using-Jenkins-and-Kubernetes.git'
                )
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker image...'
                    sh "docker build -t $DOCKER_IMAGE ."
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([string(credentialsId: DOCKERHUB_CREDENTIALS, variable: 'DOCKER_TOKEN')]) {
                    script {
                        echo 'Logging into DockerHub...'
                        sh "echo $DOCKER_TOKEN | docker login -u $DOCKER_USERNAME --password-stdin"
                        echo 'Pushing Docker image to DockerHub...'
                        sh "docker push $DOCKER_IMAGE"
                    }
                }
            }
        }

        stage('Blue-Green Deployment') {
            steps {
                script {
                    echo 'Starting Blue-Green Deployment...'
                    withCredentials([file(credentialsId: 'kubeconfig-file', variable: 'KUBECONFIG')]) {
                        sh '''
                            echo "Checking cluster access..."
                            echo "Applying Blue Deployment..."
                            kubectl apply -f k8s/deployment-blue.yaml -n $K8S_NAMESPACE
                            echo "Applying Service..."
                            kubectl apply -f k8s/service.yaml -n $K8S_NAMESPACE
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed. Check the logs above for more details.'
        }
    }
}
