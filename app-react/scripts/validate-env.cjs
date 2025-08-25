#!/usr/bin/env node

/**
 * Environment validation script
 * Run with: node scripts/validate-env.js
 */

const fs = require('fs')
const path = require('path')

const requiredEnvVars = [
  'VITE_API_URL',
  'VITE_APP_TITLE',
  'VITE_APP_VERSION'
]

const envFiles = [
  '.env',
  '.env.development',
  '.env.test',
  '.env.staging',
  '.env.production'
]

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {}
  }
  
  const content = fs.readFileSync(filePath, 'utf8')
  const env = {}
  
  content.split('\n').forEach(line => {
    const match = line.match(/^([^#][^=]+)=(.*)$/)
    if (match) {
      env[match[1].trim()] = match[2].trim()
    }
  })
  
  return env
}

function validateEnvironment() {
  console.log('🔍 Validating environment configuration...\n')
  
  let hasErrors = false
  
  // Check if .env files exist
  envFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file)
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file} exists`)
      
      // Parse and validate required variables
      const env = parseEnvFile(filePath)
      const missing = requiredEnvVars.filter(varName => !env[varName])
      
      if (missing.length > 0) {
        console.log(`❌ ${file} missing variables: ${missing.join(', ')}`)
        hasErrors = true
      } else {
        console.log(`✅ ${file} has all required variables`)
      }
    } else {
      console.log(`⚠️  ${file} not found`)
      if (file === '.env') {
        hasErrors = true
      }
    }
  })
  
  // Check if .env.local exists
  const envLocal = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envLocal)) {
    console.log('✅ .env.local exists for local development')
  } else {
    console.log('⚠️  .env.local not found - you may want to create it for local development')
  }
  
  console.log('\n📋 Summary:')
  if (hasErrors) {
    console.log('❌ Environment validation failed')
    console.log('💡 Please check the missing files/variables above')
    console.log('📖 See ENV_SETUP.md for detailed instructions')
    process.exit(1)
  } else {
    console.log('✅ Environment validation passed')
    console.log('🚀 Your environment is ready!')
  }
}

// Run validation
validateEnvironment()
