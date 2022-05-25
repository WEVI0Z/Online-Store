const CARDS_ADDRESS = "https://morfey216.github.io/online-store-bd/bd.json"

async function getCardsData(onLoad, onError) {
    const response = await fetch(CARDS_ADDRESS);

    if(response.ok) {
       onLoad(response.json); 
    } else {
        onError(response.status);
    }
}

export {getCardsData};