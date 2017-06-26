<?php 
/*
Template Name: Home template
*/

$context = Timber::get_context();
$context['page'] = new TimberPost();
Timber::render('views/home/home.twig', $context);