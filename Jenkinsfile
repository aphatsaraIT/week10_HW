pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS=credentials('dockerhub')
    }
 
    stages {
        stage('Initialize Stage') {
            steps {
            
                echo 'Initial : Delete  containers and images'
                 dir('dockercompose') { // change directory to Lab_docker_Jenkins
                    echo "Current path is ${pwd()}"
                    sh "docker-compose down --rmi all --volumes || true"
                }
            }
        }
        stage('Login Stage') {
          steps {
            echo "Login : Logging in . .."
           
            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
          }
        }
         stage('Build docker') {
            steps {
                dir('w10_compose') { // change directory to Lab_docker_Jenkins
                    sh 'docker-compose build'
                }
            }
        }
        stage('Push Stage') {
            steps {
                dir('w10_compose') { // change directory to Lab_docker_Jenkins
                    echo "Push : Current path is ${pwd()}"
                    sh "docker-compose push"
                }
            }
        }
        stage('Trigger Slave Dockerhub last up') {
            steps {
                dir('w10_compose') { // change directory to Lab_docker_Jenkins
                    echo "Trigger : calling Slave job . . ."
                    sh 'echo "HELLO ${DOCKERHUB_CREDENTIALS_USR}"'
                    build job: 'slave', parameters: [string(name: 'DOCKERHUB_CREDENTIALS_USR', value: env.DOCKERHUB_CREDENTIALS_USR), string(name: 'DOCKERHUB_CREDENTIALS_PSW', value: env.DOCKERHUB_CREDENTIALS_PSW)]
                }
            }
        }

    
       

    }
}