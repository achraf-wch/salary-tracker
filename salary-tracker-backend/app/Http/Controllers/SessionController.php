<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\goal;
use App\Models\cat_goal;
use App\Models\date;
use App\Models\progress;

class sessionController extends Controller
{
    function goal(Request $request){
      
          $goal= goal::create([
            'id_client'=>$request->input('id_client'),
            'custom'=>$request->input('custom'),
             'save'=>$request->input('save'),
            'invest'=>$request->input('invest'),
          ]);
          
          return response()->json($goal);
    }
     function cat_goal(Request $request){
          $request->validate([
            'cat_custom'=>'required',
            
          ]);
          $cat_goal= cat_goal::create([
            'id_client'=>$request->input('id_client'),
            'id_category'=>$request->input('id_category'),
            'cat_custom'=>$request->input('cat_custom'),
             
          ]);
          return response()->json($cat_goal);
    }
     function date(Request $request){
          $request->validate([
            'startDate'=>'required'|'date',
            'endDate'=>'required|date',
          ]);
          $date= date::create([
            'start'=>$request->input('start'),
             'end'=>$request->input('end'),
          ]);
          return response()->json($date);
    }
    function progress(Request $request){
    $request->validate([

    ]);
    $progress=progress::create([
        'id_client'=>$request->input('id_client'),
        'id_goal'=>$request->input('id_goal'),
        'id_date'=>$request->input('id_date'),
      
    ]);
    return response()->json($progress);
    }
}
