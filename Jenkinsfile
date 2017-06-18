pipeline {
	agent { docker 'node:6.9.5' }
	stages {
		stage('build') {
			steps {
				sh 'npm install' 
				sh 'npm run refreshMongo' 
				sh 'npm test'
		}
		}
	}
}
