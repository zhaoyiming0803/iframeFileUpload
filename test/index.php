<?php

  $files = $_FILES;
  
  $data = $_POST;

  $body = array(
    'files' => $files,
    'data' => $data
  );

  echo json_encode($body);