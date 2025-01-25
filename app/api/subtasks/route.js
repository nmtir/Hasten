import { getSubtasksByParent } from 'config/data.config';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get('taskId');

  if (!taskId) {
    return new Response(JSON.stringify({ error: 'Task ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    console.log('Getting Subtasks...', taskId);
    // Your server-side logic to fetch subtasks by taskId
    const subtasks = await getSubtasksByParent(taskId);

    return new Response(JSON.stringify(subtasks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching subtasks:', error);

    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
