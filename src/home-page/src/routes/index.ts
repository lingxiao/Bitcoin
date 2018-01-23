/**
    @file   : index.ts
    @author : Xiao Ling <lingxiao@seas.upenn.edu>
    @date   : 1/19/2018
*/
import { Router } from 'express';
import * as express from 'express';

const index: Router = Router();

index.get('/', (req, res, next) => {

	// res.render('index', {title: 'home-page', message: 'welcome to the home page'})
	// console.log("navigated to home page")
	res.send("hello world from home page")

});


export default index;

