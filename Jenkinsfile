pipeline {
    agent any
    environment {
        DOCKER_HUB = 'ujwalnagrikar'
        IMAGE_NAME = 'my-blue-green-site'
        IMAGE_TAG  = 'latest'
    }
    stages {
        stage('Clone Repo') {
            steps {
                     git branch: 'main', url: 'https://github.com/UjwalNagrikar/Blue-Green-Deployment-Using-Jenkins-and-Kubernetes.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_HUB/$IMAGE_NAME:$IMAGE_TAG .'
            }
        }
        stage('Push to DockerHub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_HUB --password-stdin'
                    sh 'docker push $DOCKER_HUB/$IMAGE_NAME:$IMAGE_TAG'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/deployment-blue.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
                sh 'kubectl get svc'
            }
        }
    }
}
