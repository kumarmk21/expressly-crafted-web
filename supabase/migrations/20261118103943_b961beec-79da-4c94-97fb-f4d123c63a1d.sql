alter table public.job_openings add column if not exists short_description text;

update public.job_openings
   set title = 'Operations Manager',
       description = 'Manage daily logistics operations, coordinate with branch teams, and ensure timely delivery across the network.',
       short_description = 'Manage daily logistics operations, coordinate branch teams and ensure timely delivery across the network.'
 where id = '419ecdc0-02c0-4e59-bbdb-be79360b9bbe';

update public.job_openings
   set title = 'Fleet Supervisor',
       description = 'Supervise fleet operations, driver scheduling and on-time dispatch across regional hubs.',
       short_description = 'Supervise fleet operations, driver scheduling and on-time dispatch across regional hubs.'
 where id = 'b9213208-76f2-47ac-aca2-2cd57960b57b';

update public.job_openings
   set short_description = 'Grow Scorpion''s customer base in your area: drive B2B express cargo sales, build key accounts and hit revenue targets. Graduate, 5+ years in sales (express background preferred). Salary upto 9 LPA.'
 where id = 'b1e113a1-aa9a-4648-8a76-be61b97b8817';

update public.job_openings
   set short_description = 'Handle end-to-end recruitment: sourcing, screening, candidate follow-ups, documentation and offer releases. Graduate/Postgraduate with strong communication and follow-up skills. Salary upto 4 LPA.'
 where id = '88e20a76-5121-44c5-b7f0-c5de1cb6f051';