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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Message ID is required' });
  }

  // PATCH /api/messages/[id] — update status
  if (req.method === 'PATCH') {
    try {
      const { status } = req.body;

      if (status !== 'new' && status !== 'reviewed') {
        return res.status(400).json({ error: 'Status must be "new" or "reviewed"' });
      }

      const { data, error } = await supabase
        .from('recruiter_messages')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Message not found' });
        }
        throw error;
      }

      const updated = data as RecruiterMessage;
      return res.status(200).json({
        success: true,
        message: {
          ...updated,
          createdAt: updated.created_at,
        },
      });
    } catch (error) {
      console.error(`PATCH /api/messages/${id} error:`, error);
      return res.status(500).json({ error: 'Failed to update message' });
    }
  }

  // DELETE /api/messages/[id]
  if (req.method === 'DELETE') {
    try {
      const { error, count } = await supabase
        .from('recruiter_messages')
        .delete({ count: 'exact' })
        .eq('id', id);

      if (error) throw error;

      if (count === 0) {
        return res.status(404).json({ error: 'Message not found' });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(`DELETE /api/messages/${id} error:`, error);
      return res.status(500).json({ error: 'Failed to delete message' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
