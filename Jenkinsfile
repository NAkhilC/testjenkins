

def templateName = 'nodejs-example' 
def app
pipeline {
  agent {
    node {
      label 'nodejs' 
    }
  }
  options {
    timeout(time: 20, unit: 'MINUTES') 
  }
  stages {
   stage('Clone repository') {
        checkout scm
    }
    stage('Build image') {
        app = docker.build("akhil2715/testnodeapp")
    }
    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker') {
            app.push("latest")
        }
    }
  }
}