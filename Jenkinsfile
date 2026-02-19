pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "sudarshan2244/multi-env-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/sdarshandeshpande-395/multi-env-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:latest .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds',
                    usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $DOCKER_IMAGE:latest
                    '''
                }
            }
        }

        stage('Deploy to Dev') {
            steps {
                sh 'kubectl apply -f k8s/dev/ -n dev'
            }
        }

        stage('Deploy to QA') {
            steps {
                sh 'kubectl apply -f k8s/qa/ -n qa'
            }
        }

        stage('Approval for Prod') {
            steps {
                input message: "Deploy to Production?"
            }
        }

        stage('Deploy to Prod') {
            steps {
                sh 'kubectl apply -f k8s/prod/ -n prod'
            }
        }
    }
}
