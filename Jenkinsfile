
pipeline{  
  environment {
    registry = "<Your-registry-username>/node-helloworld"
    registryCredential = '<dockerhub_credentials_id_in_jenkins>'
    dockerImage = ''
  }
  agent any
    stages {
        stage('Build'){
           steps{
              script{
                sh 'npm install'
              } 
           }   
        }
        stage('Building image') {
            steps{
                script {
                  dockerImage = docker.build registry + ":latest"
                 }
             }
          }
          stage('Push Image') {
              steps{
                  script {
                      docker.withRegistry('https://registry.hub.docker.com', 'docker') {

        def customImage = docker.build("akhil2715/dockerwebapp")

        /* Push the container to the custom Registry */
        customImage.push()
    }                
                      }
                   }
                } 
           }
           stage('Deploying'){
            steps{
                sh 'deployed' 
            }
        }
    }
