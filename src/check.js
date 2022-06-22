const api = require ('./api/index.js');

const eraseBlock = (array, index) => array.filter((_, idx) => idx !== index);
const getFirstBlock = (array) => array.shift(); 
const getLastBlock = (array) => array.pop();
const isLastBlockToCheck = (array) => array.length === 1;
const formatRiddleToVerify = (array) => array.join('');

const check = async (blocks, token) => {
  
  const check2Blocks= (block_1, block_2) => 
    api.checkIfContigous(token, block_1, block_2);

  let disorderedBlocks = [...blocks];
  
  let resolvedRiddle = [ getFirstBlock(disorderedBlocks) ];
  let lastRiddleBlock = getLastBlock(resolvedRiddle);

  const orderBlocks = (index, promise) => {
    return promise.then(({message}) => {
      if(message){
        console.log('================> INDEX: ', index);

        resolvedRiddle = [...resolvedRiddle, lastRiddleBlock, disorderedBlocks[index]];
        disorderedBlocks = eraseBlock(disorderedBlocks, index);
        lastRiddleBlock = getLastBlock(resolvedRiddle);
  
        if(isLastBlockToCheck(disorderedBlocks)){
          resolvedRiddle = [...resolvedRiddle, lastRiddleBlock, ...disorderedBlocks];     

          return api.verifyAnswer(token, formatRiddleToVerify(resolvedRiddle))
            .then(({message}) => {
              console.log('Verified: ', message);
              return resolvedRiddle;
            })
          
        } else {
          return orderBlocks(0, check2Blocks(lastRiddleBlock, disorderedBlocks[0]));
        }

      } else {
        return orderBlocks(index+1, check2Blocks(lastRiddleBlock, disorderedBlocks[index+1]));
      }
    })
  }

  return orderBlocks(0, check2Blocks(lastRiddleBlock, disorderedBlocks[0]))
  
};




module.exports = check;