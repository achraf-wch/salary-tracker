<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\client;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Auth;
class AccountController extends Controller
{
    function register(Request $request){
    $request->validate([
         'name'=>'required|min:4',
         'email'=>'required|unique:clients,email',
         'age'=>'required'
         ]);
    $client = client::create([
          'name'=>$request->input('name'),
          'age'=> $request->input('age'),
          'email'=>$request->input('email'),
          'password'=>Hash::make($request->input('password'))
         ]);
    return response()->json($client);
   
    }
      public function login(Request $request)
    {
        // ✅ Validate input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // ✅ Find client by email
        $client = Client::where('email', $request->email)->first();

        // ✅ Check if client exists and password is correct
        if (!$client || !Hash::check($request->password, $client->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // ✅ Create token
        $token = $client->createToken('api_token')->plainTextToken;

        // ✅ Return client data and token
        return response()->json([
            'client' => $client,
            'token' => $token
        ]);
    }

}
