export const shortenAddress = (fullAddress) =>{
    return `${fullAddress.slice(0, 6)}...${fullAddress.slice(-4)}`;
}