import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    const { userId, password } = await req.json();

    if (!userId || !password || typeof userId !== 'string' || typeof password !== 'string') {
      return json({ success: false, message: 'User ID and password are required' });
    }

    const trimmedId = userId.trim();

    // 1) Authenticate via the official login endpoint
    const loginRes = await fetch('https://seplapi.cygnux.in/V1/Authenticate/Login', {
      method: 'POST',
      headers: { accept: 'text/plain', 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: trimmedId, password }),
    });

    if (!loginRes.ok) {
      return json({ success: false, message: 'Authentication service unavailable' });
    }

    const loginPayload: any = await loginRes.json();
    const data = loginPayload?.data;

    if (!data?.token || !data?.userId) {
      return json({
        success: false,
        message: loginPayload?.message || loginPayload?.errors?.message || 'Invalid User ID or password',
      });
    }

    // 2) Verify the user is active (status = 100) via the User Master endpoint
    try {
      const masterRes = await fetch(
        `https://seplapi.cygnux.in/V1/Operation/GetUserMaster?SearchFilter=${encodeURIComponent(trimmedId)}`,
        { headers: { accept: 'text/plain' } },
      );
      if (masterRes.ok) {
        const masterPayload: any = await masterRes.json();
        const u = Array.isArray(masterPayload?.data)
          ? masterPayload.data.find((x: any) => String(x.userId).trim() === trimmedId)
          : null;
        if (u && String(u.status).trim() !== '100') {
          return json({ success: false, message: 'User account is not active' });
        }
      }
    } catch (_) {
      // Non-fatal: master check is a best-effort guard
    }

    return json({
      success: true,
      user: {
        userId: data.userId,
        name: data.name,
        emailId: data.emailId,
        branchCode: data.branchCode,
        branchName: data.branchName,
        designation: data.designation,
        userType: data.userType,
        token: data.token,
      },
    });
  } catch (err) {
    console.error('employee-login error', err);
    return json({ success: false, message: 'Login failed. Please try again.' }, 500);
  }
});
