import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface RecruiterMessage {
  id: string;
  name: string;
  company: string;
  email: string;
  role: string;
  message: string;
  created_at: string;
  status: 'new' | 'reviewed';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS from the same domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET /api/messages
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('recruiter_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Normalize field names for frontend (created_at → createdAt)
      const messages = (data as RecruiterMessage[]).map((m) => ({
        id: m.id,
        name: m.name,
        company: m.company,
        email: m.email,
        role: m.role,
        message: m.message,
        createdAt: m.created_at,
        status: m.status,
      }));

      return res.status(200).json({ success: true, messages });
    } catch (error) {
      console.error('GET /api/messages error:', error);
      return res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  }

  // POST /api/messages
  if (req.method === 'POST') {
    try {
      const { name, company, email, role, message } = req.body;

      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ error: 'Name, email, and message are required.' });
      }

      const newMessage = {
        id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        name: String(name).trim(),
        company: String(company || 'Confidential').trim(),
        email: String(email).trim(),
        role: String(role || 'General Opportunity').trim(),
        message: String(message).trim(),
        status: 'new' as const,
      };

      const { data, error } = await supabase
        .from('recruiter_messages')
        .insert([newMessage])
        .select()
        .single();

      if (error) throw error;

      const inserted = data as RecruiterMessage;
      return res.status(201).json({
        success: true,
        message: {
          ...inserted,
          createdAt: inserted.created_at,
        },
      });
    } catch (error) {
      console.error('POST /api/messages error:', error);
      return res.status(500).json({ error: 'Failed to save message' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
