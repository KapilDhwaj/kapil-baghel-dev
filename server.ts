import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// ── Supabase client (uses SERVICE ROLE key for full server-side access) ──────
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

/** Normalize Supabase snake_case → camelCase for the frontend */
function normalize(m: RecruiterMessage) {
  return {
    id: m.id,
    name: m.name,
    company: m.company,
    email: m.email,
    role: m.role,
    message: m.message,
    createdAt: m.created_at,
    status: m.status,
  };
}

// ── GET all recruiter messages ────────────────────────────────────────────────
app.get('/api/messages', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('recruiter_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, messages: (data as RecruiterMessage[]).map(normalize) });
  } catch (error) {
    console.error('GET /api/messages error:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// ── POST new recruiter message ────────────────────────────────────────────────
app.post('/api/messages', async (req, res) => {
  try {
    const { name, company, email, role, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
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

    res.status(201).json({ success: true, message: normalize(data as RecruiterMessage) });
  } catch (error) {
    console.error('POST /api/messages error:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// ── PATCH message status ──────────────────────────────────────────────────────
app.patch('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
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

    res.json({ success: true, message: normalize(data as RecruiterMessage) });
  } catch (error) {
    console.error(`PATCH /api/messages/:id error:`, error);
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// ── DELETE message ────────────────────────────────────────────────────────────
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error, count } = await supabase
      .from('recruiter_messages')
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw error;

    if (count === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(`DELETE /api/messages/:id error:`, error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// ── Start server ──────────────────────────────────────────────────────────────
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`   Database: Supabase PostgreSQL`);
  });
}

startServer();
