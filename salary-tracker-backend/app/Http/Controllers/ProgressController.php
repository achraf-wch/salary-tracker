<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\progress;
use App\Models\goal;
use Illuminate\Support\Facades\DB;
use App\Models\cat_goal;
class ProgressController extends Controller
{
    function progress(Request $request){
        $id_client = $request->input('id_client');
 $progress = progress::join('clients','progress.id_client','=','clients.id_client')
                      ->join('dates','progress.id_date','=','dates.id_date')
                      ->join('goals','progress.id_goal','=','goals.id_goal')
                      ->join('cat_goals','progress.id_client','=','cat_goals.id_client')
                      ->where('progress.id_client',$id_client)
                     ->get(['progress.*','clients.*','dates.*','goals.*','cat_goals.*']);
 return response()->json($progress);
    }
   function update(Request $request) {

   $id_client = $request->input('id_client');
   $id_cat_goal = $request->input('id_cat_goal');
   $amount = $request->input('amount');
 
    $progress=progress::where('progress.id_client',$id_client)
                    ->last();
                    if($progress){
                        $cat_goal=cat_goal::find($id_cat_goal);
                        if($cat_goal&&$cat_goal->cat_suctom>=$amount){
                            $cat_goal->cat_custom-=$amount;
                             $goal=goal::find($id_client);
                        if($goal&&$goal->custom>=$amount){
                            $goal->custom-=$amount;
                        }
                        $goal->save();
                        $cat_goal->save();
                        return response()->json($cat_goal);
                        }
                       
                    }
                     
                    }
                     
                           
                 
                     
                     


   }

