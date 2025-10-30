// Lightweight, client-safe fallback AI responder.
// The original implementation used server-side Google GenAI which is not safe/runable in the browser.
// Replace with a simple rule-based responder that extracts answers from the provided CV JSON.
export const getAiCvResponse = async (prompt: string, cvData: string): Promise<string> => {
    try {
        const data = JSON.parse(cvData || '{}');
        const q = (prompt || '').toLowerCase();

        // Helpers
        const joinList = (arr: any[]) => (arr && arr.length ? arr.join(', ') : null);

        // Skills
        if (/skill|tech|framework|tool|stack|language(s)?\b/.test(q)) {
            const skills = data.skills || {};
            // Flatten categories
            const parts: string[] = [];
            Object.entries(skills).forEach(([k, v]: any) => {
                if (Array.isArray(v) && v.length) parts.push(`${k}: ${v.join(', ')}`);
            });
            if (parts.length) return `Skills — ${parts.join(' · ')}`;
            return "No skills listed in the CV.";
        }

        // Certifications
        if (/certif|certificate|certifications?/.test(q)) {
            const certs: string[] = data.certifications || [];
            if (certs.length) return `Certifications: ${certs.join('; ')}`;
            return "No certifications are listed in the CV.";
        }

        // Languages
        if (/language|lang\b/.test(q)) {
            const langs = data.languages || {};
            const entries = Object.entries(langs).map(([k, v]) => `${k.toUpperCase()}: ${v}`);
            if (entries.length) return `Languages — ${entries.join(' · ')}`;
            return "No languages specified in the CV.";
        }

        // Projects
        if (/project|projects|app|application|store|ecommerce|eMart|EgyCoPt|Cosmia|AlzMind|ChoubikLoubik/.test(q)) {
            const projects = data.projects || [];
            if (projects.length) {
                // Try to find a specific project mentioned
                for (const p of projects) {
                    if (q.includes((p.name || '').toLowerCase())) {
                        return `${p.name} — ${p.desc} (Tech: ${(p.tech || []).join(', ')})`;
                    }
                }
                // Otherwise list project names
                return `Projects: ${projects.map((p: any) => p.name).join('; ')}`;
            }
            return "No projects are listed in the CV.";
        }

        // Experience
        if (/experience|intern|internship|company|worked|role|developer|engineer/.test(q)) {
            const exp = data.experience || [];
            if (exp.length) {
                // return concise bullets
                const bullets = exp.slice(0, 4).map((e: any) => `${e.year || e.period || ''} — ${e.title} at ${e.company}`);
                return `Experience — ${bullets.join(' · ')}`;
            }
            return "No experience entries found in the CV.";
        }

        // Contact
        if (/contact|email|linkedin|github|reach|connect/.test(q)) {
            const contact = data.contact || {};
            const parts: string[] = [];
            if (contact.email) parts.push(`Email: ${contact.email}`);
            if (contact.linkedin) parts.push(`LinkedIn: ${contact.linkedin}`);
            if (contact.github) parts.push(`GitHub: ${contact.github}`);
            if (parts.length) return parts.join(' · ');
            return "No contact information found in the CV.";
        }

        // Fallback: attempt to find a matching key in cv JSON
        for (const key of ['skills', 'projects', 'experience', 'certifications', 'languages', 'contact']) {
            if (q.includes(key)) {
                const val = (data as any)[key];
                if (!val) return `No ${key} information in the CV.`;
                if (Array.isArray(val)) return `${key}: ${val.map((x: any) => (x.name ? x.name : JSON.stringify(x))).join('; ')}`;
                if (typeof val === 'object') return `${key}: ${JSON.stringify(val)}`;
                return `${key}: ${String(val)}`;
            }
        }

        // Generic help
        return "I can answer questions about Amira's skills, projects, experience, certifications, and contact. Try asking: 'What skills does Amira have?' or 'Tell me about the eMart project.'";
    } catch (err) {
        console.error('getAiCvResponse fallback error:', err);
        return "I'm sorry, I couldn't process the CV data. Please try again later.";
    }
};
