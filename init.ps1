
# Create the directory structure
New-Item -ItemType Directory -Force -Path "src"
New-Item -ItemType Directory -Force -Path "src/api"
New-Item -ItemType Directory -Force -Path "src/config"
New-Item -ItemType Directory -Force -Path "src/data"
New-Item -ItemType Directory -Force -Path "src/models"
New-Item -ItemType Directory -Force -Path "src/utils"
New-Item -ItemType Directory -Force -Path "test"
New-Item -ItemType Directory -Force -Path "test/endpoints"
New-Item -ItemType Directory -Force -Path "test/utils"
New-Item -ItemType Directory -Force -Path "reports"

# Create the necessary files
New-Item -ItemType File -Force -Path "src/index.ts"
New-Item -ItemType File -Force -Path "src/api/index.ts"
New-Item -ItemType File -Force -Path "src/config/index.ts"
New-Item -ItemType File -Force -Path "src/data/index.ts"
New-Item -ItemType File -Force -Path "src/models/index.ts"
New-Item -ItemType File -Force -Path "src/utils/index.ts"
New-Item -ItemType File -Force -Path "test/index.ts"
New-Item -ItemType File -Force -Path "reports/index.html"
