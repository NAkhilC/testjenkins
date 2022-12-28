pipeline {
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
    stage('Test Image'){
       app.inside {
         sh 'echo "TEST PASSED"'
      }  
    }
     stage('Push Image'){
       docker.withRegistry('https://registry.hub.docker.com', 'docker') {  
        docker.build("akhil2715/dockerwebapp1")                   
       app.push("latest")   
   }
}
}