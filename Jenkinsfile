#!/bin/bash
def loadValuesYaml(){
  def templatePath  = readYaml file: 'jj.yaml'
  return templatePath;
} 
def templateName = 'nodejs-example' 
pipeline {
  agent any

  options {
    timeout(time: 20, unit: 'MINUTES') 
  }
  environment {
    templatePath = loadValuesYaml()
  }
  stages {
    stage('all projects') {
        steps {
            script {
                openshift.withCluster() {
                    openshift.withProject() {
                        echo "Using project: ${openshift.project()}"
                    }
                }
            }
        }
    }
    stage('cleanup') {
      steps {
        script {
            openshift.withCluster() {
                openshift.withProject() {
                  openshift.selector("all", [ template : templateName ]).delete() 
                  if (openshift.selector("secrets", templateName).exists()) { 
                    openshift.selector("secrets", templateName).delete()
                  }
                  echo "done cleanup"
                }
            }
        }
      }
    }
    stage('create') {
      steps {
        script {
            openshift.withCluster() {
                openshift.withProject() {
                  echo "inside"
                  echo templatePath.toString()
                  datas = readYaml (file: 'jj.yaml')
                  echo datas
                  openshift.newApp({"apiVersion": "apps/v1","kind": "Deployment","metadata": { "name": "sample-nodejs", "labels": {   "app": "sample-nodejs" } }, "spec": {   "selector": {     "matchLabels": {       "app": "sample-nodejs"     }   },   "template": {     "metadata": {      "labels": {        "app": "sample-nodejs"      }    } "spec": {      "containers": {         "image": "akhil2715/testnodeapp:latest",   "name": "nodejs-api",    "imagePullPolicy": "Always",    "ports": {    "containerPort": 3000     }     }   }   } }}) 
                }
                 echo "done creating"
            }
            
        }
      }
    }
    stage('build') {
      steps {
        script {
            openshift.withCluster() {
                openshift.withProject() {
                  def builds = openshift.selector("bc", templateName).related('builds')
                  timeout(5) { 
                    builds.untilEach(1) {
                      return (it.object().status.phase == "Complete")
                    }
                  }
                }
            }
        }
      }
    }
    stage('deploy') {
      steps {
        script {
            openshift.withCluster() {
                openshift.withProject() {
                  def rm = openshift.selector("dc", templateName).rollout().latest()
                  timeout(5) { 
                    openshift.selector("dc", templateName).related('pods').untilEach(1) {
                      return (it.object().status.phase == "Running")
                    }
                  }
                }
            }
        }
      }
    }
    stage('tag') {
      steps {
        script {
            openshift.withCluster() {
                openshift.withProject() {
                  openshift.tag("${templateName}:latest", "${templateName}-staging:latest") 
                }
            }
        }
      }
    }
  }
}