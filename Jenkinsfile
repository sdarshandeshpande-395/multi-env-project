pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "sudarshan2244/multi-env-app"
        GIT_REPO = "https://github.com/sdarshandeshpande-395/multi-env-project.git"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: "${GIT_REPO}"
            }
        }

        stage('Install Dependencies') {
    steps {
        dir('app.json') {
            sh 'npm install'
        }
    }
}


        stage('Build Docker Image') {
    steps {
        sh 'docker build -t $DOCKER_IMAGE -f app.json/Dockerfile app.json'
    }
}



        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-cred',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push $DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Deploy to Dev') {
            steps {
                sh 'kubectl apply -f k8s/dev/'
            }
        }

        stage('Deploy to QA') {
            steps {
                sh 'kubectl apply -f k8s/qa/'
            }
        }

        stage('Approval for Prod') {
            steps {
                input message: "Deploy to Production?"
            }
        }

        stage('Deploy to Prod') {
            steps {
                sh 'kubectl apply -f k8s/prod/'
            }
        }
    }
}
