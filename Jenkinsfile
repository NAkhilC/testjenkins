node {
     def app 
     agent {
    node {
      label 'nodejs' 
       }
     }
    options {
      timeout(time: 20, unit: 'MINUTES') 
    }
     stage('clone repository') {
      checkout scm  
    }
     stage('Build docker Image'){
      app = docker.build("akhil2715/dockerwebapp1")
    }
     stage('Test Image'){
       app.inside {
         sh 'echo "TEST PASSED"'
      }  
    }
     stage('Push Image'){
       docker.withRegistry('https://registry.hub.docker.com', 'docker') {            
       app.push("${env.BUILD_NUMBER}")            
       app.push("latest")   
   }
}
}