// Initialize the JS client

// Make a request
let { data: todos, error } = await supabase.from("todos").select("*");
