<?php

function generateOrderId()
{
    $timestamp = substr(time(), -2);
    $randomNumber = mt_rand(10000, 99999);
    return $timestamp . $randomNumber;
}