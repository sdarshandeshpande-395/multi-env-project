pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "sudarshan2244/multi-env-app"
        DOCKER_TAG = "latest"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh 'docker push $DOCKER_IMAGE:$DOCKER_TAG'
            }
        }

        stage('Deploy to Dev') {
            steps {
                sh 'kubectl apply -f k8s/dev-deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
            }
        }

        stage('Deploy to QA') {
            steps {
                input message: "Deploy to QA?"
                sh 'kubectl apply -f k8s/qa-deployment.yaml'
            }
        }

        stage('Deploy to Prod') {
            steps {
                input message: "Deploy to Production?"
                sh 'kubectl apply -f k8s/prod-deployment.yaml'
            }
        }
    }
}
