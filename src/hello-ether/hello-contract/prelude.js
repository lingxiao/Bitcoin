/**
	@file prelude.js
	@author Xiao Ling <lingxiao@seas.upenn.edu>
	@date 1/4/2018
*/



var exports = module.exports = {}

module.exports = {

	typeOf : function(o){

		return Object.prototype.toString.call(o)

	},

	foo : function(){

		console.log("hello world")
	}

}

