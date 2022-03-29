import supabase from "./server.js";

export async function checkEmptyDB() {
  const { data } = await supabase.from("todo").select();
  localStorage.setItem("datacount", data.length);
  return data.length;
}

export async function topButtonAllSearch(searchValue) {
  const { data } = await supabase
    .from("todo")
    .select()
    .ilike("name", `%${searchValue}%`)
    .order("id", { ascending: false });
  return data;
}
export async function topButtonCompleteSearch(searchValue) {
  const { data } = await supabase
    .from("todo")
    .select()
    .ilike("name", `%${searchValue}%`)
    .not("completed_on", "is", null)
    .order("id", { ascending: false });
  return data;
}

export async function topButtonIncompleteSearch(searchValue) {
  const { data } = await supabase
    .from("todo")
    .select()
    .ilike("name", `%${searchValue}%`)
    .is("completed_on", null)
    .order("id", { ascending: false });
  return data;
}
export async function addTask(taskInput) {
  const { data, error } = await supabase
    .from("todo")
    .insert([{ name: taskInput, created_at: new Date(Date.now()) }]);
  return data;
}
export async function showTasksDB(currentIndex) {
  const { data, error } = await supabase
    .from("todo")
    .select()
    .order("id", { ascending: false })
    .range(currentIndex, currentIndex + 5);
  return data;
}
export async function showCompletedTasksDB(currentCompletedIndex) {
  const { data, error } = await supabase
    .from("todo")
    .select()
    .order("id", { ascending: false })
    .not("completed_on", "is", null)
    .range(currentCompletedIndex, currentCompletedIndex + 5);
  return data;
}
export async function showIncompletedTasksDB(currentIncompletedIndex) {
  const { data, error } = await supabase
    .from("todo")
    .select()
    .is("completed_on", null)
    .order("id", { ascending: false })
    .range(currentIncompletedIndex, currentIncompletedIndex + 5);
  return data;
}
export async function updateData(input) {
  const { data, error } = await supabase
    .from("todo")
    .update({ name: input.value })
    .match({ id: input.id });
  return data;
}
// complete
export async function completedTask(e) {
  const { data, error } = await supabase
    .from("todo")
    .update({ completed_on: new Date(Date.now()) })
    .match({ id: e.id });
}
