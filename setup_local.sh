if ! docker info >/dev/null 2>&1; then
    echo "Docker Desktop n'est pas lancé. Merci d'ouvrir Docker Desktop puis de relancer le script."
    exit 1
fi

echo "Installation des dépendances frontend..."
cd frontend/
npm install

echo "Installation des dépendances backend..."
cd ../backend/
npm install 

echo "Lancement des containers Docker..."
export COUCHDB_USER="tbhc"
export COUCHDB_PASSWORD="tbhc"
docker compose up -d

echo "Projet local initialisé avec succès !"