class ConsoleStylingClass{
  static run(){
    console.log("######          2018 AUG 11      ######");
    console.log("###            CS206 Project        ###");
    console.log("###         "+new Date().toLocaleString()+"      ###")
    console.log("\nCreated by @achini @budhdhini @chandana\n@lazzy07 @nethmi");
    console.log("________________________________________\n");
  }

  static finish(){
    console.log("________________________________________");
    console.log("finished @ "+new Date().toLocaleString()+" ###\n\n\n");
  }
}

export default ConsoleStylingClass;