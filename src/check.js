const api = require ('./api/index.js');

const eraseBlock = (array, index) => array.filter((_, idx) => idx !== index);
const getFirstBlock = (array) => array.shift(); 
const getLastBlock = (array) => array.pop();
const isLastBlockToCheck = (array) => array.length === 1;

const check = async (blocks, token) => {
  
  const checkBlocksContiguity= (block_1, block_2) => 
    api.checkIfContigous(token, block_1, block_2);

  let disorderedBlocks = [...blocks];
  
  let resolvedRiddle = [ getFirstBlock(disorderedBlocks) ];
  let lastRiddleBlock = getLastBlock(resolvedRiddle);

  const orderBlocks = (index, promise) => {
    return promise.then(({message}) => {
      if(message){
        resolvedRiddle = [...resolvedRiddle, lastRiddleBlock, disorderedBlocks[index]];
        console.log('>>>> Solving riddle... ', resolvedRiddle);
        disorderedBlocks = eraseBlock(disorderedBlocks, index);
        lastRiddleBlock = getLastBlock(resolvedRiddle);
  
        if(isLastBlockToCheck(disorderedBlocks)){
          resolvedRiddle = [...resolvedRiddle, lastRiddleBlock, ...disorderedBlocks];
          console.log('===> Solution: ', resolvedRiddle);
          return resolvedRiddle;          
        } else {
          return orderBlocks(0, checkBlocksContiguity(lastRiddleBlock, disorderedBlocks[0]));
        }

      } else {
        if(!disorderedBlocks[index+1]){
          console.log('===> Not solved - Avoiding infinite loop <===', blocks);
          return blocks;
        }
        return orderBlocks(index+1, checkBlocksContiguity(lastRiddleBlock, disorderedBlocks[index+1]));
      }
    })
  }

  console.log(' *****  Received blocks: *****  ', blocks);
  return orderBlocks(0, checkBlocksContiguity(lastRiddleBlock, disorderedBlocks[0]))
  
};




module.exports = check;