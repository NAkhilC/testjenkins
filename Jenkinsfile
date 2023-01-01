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
  }
}