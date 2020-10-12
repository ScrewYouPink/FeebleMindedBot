cd ..
Xcopy /E /I FeebleMindedBot FlamingoC
cd FlamingoC
RMDIR /Q/S node_modules
docker stop FlamingoBot
docker rm FlamingoBot
docker rmi flamingobot
docker build -t flamingobot .
docker run --name FlamingoBot -d flamingobot
cd ..
RMDIR /Q/S FlamingoC