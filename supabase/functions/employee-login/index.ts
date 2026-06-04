import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { userId, password } = await req.json();

    if (!userId || !password || typeof userId !== 'string' || typeof password !== 'string') {
      return new Response(
        JSON.stringify({ success: false, message: 'User ID and password are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const trimmedId = userId.trim();
    const apiUrl = `https://seplapi.cygnux.in/V1/Operation/GetUserMaster?SearchFilter=${encodeURIComponent(trimmedId)}`;

    const apiRes = await fetch(apiUrl, { headers: { accept: 'text/plain' } });

    if (!apiRes.ok) {
      return new Response(
        JSON.stringify({ success: false, message: 'Authentication service unavailable' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const payload = await apiRes.json();
    const users: any[] = Array.isArray(payload?.data) ? payload.data : [];
    const user = users.find((u) => String(u.userId).trim() === trimmedId);

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid User ID or password' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (String(user.status).trim() !== '100') {
      return new Response(
        JSON.stringify({ success: false, message: 'User account is not active' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Compare against lastPwd (plaintext current password from API)
    const expected = String(user.lastPwd ?? '').trim();
    if (!expected || expected !== password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid User ID or password' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          userId: user.userId,
          name: user.name,
          empId: user.empId,
          emailId: user.emailId,
          branchCode: user.branchCode,
          department: user.department,
          designation: user.designation,
        },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('employee-login error', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Login failed. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
