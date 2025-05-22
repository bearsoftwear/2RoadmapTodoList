'use client';

import type React from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

export function FormTask() {
  return (
    <>
      <form>
        <div>
          <TextField label="Task Title" variant="outlined" error />
          <TextField
            label="Description (optional)"
            variant="outlined"
            multiline
            maxRows={4}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="contained" color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
