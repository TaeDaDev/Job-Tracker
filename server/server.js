import "dotenv/config";
import cors from "cors";
import express from "express";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/jobs", async (req, res) => {
  const { data, error } = await supabase.from("jobs").select("*");
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

app.post("/jobs", async (req, res) => {
  const { company_name, job_title, status, notes, application_date } = req.body;
  const { data, error } = await supabase
    .from("jobs")
    .insert([{ company_name, job_title, status, notes, application_date }])
    .select("*")
    .single();
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(201).json(data);
  }
});

app.put("/jobs/:id", async (req, res) => {
  const { id } = req.params;
  const { company_name, job_title, status, notes, application_date } = req.body;
  const { data, error } = await supabase
    .from("jobs")
    .update({ company_name, job_title, status, notes, application_date })
    .eq("id", id)
    .select("*")
    .single();
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

app.delete("/jobs/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", id)
    .select("*")
    .single();
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
