if ! docker info >/dev/null 2>&1; then
    echo "Docker Desktop n'est pas lancé. Merci d'ouvrir Docker Desktop puis de relancer le script."
    exit 1
fi

echo "Installation des dépendances frontend..."
cd frontend/
npm install

echo "Build du frontend..."
cd ../frontend/
npm run build

echo "Génération des samples data..."
cd ..
npx --yes dummy-json sample_data.hbs > frontend/public/data/sample_data.json

echo "Installation des dépendances backend..."
cd backend/
npm install 

export COUCHDB_USER="tbhc"
export COUCHDB_PASSWORD="tbhc"

echo "Lancement des containers Docker..."
docker compose down
docker compose up -d

echo "Projet local initialisé avec succès !"