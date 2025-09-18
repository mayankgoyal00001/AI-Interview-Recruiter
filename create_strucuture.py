import os

# Define project structure as a nested dictionary
structure = {
    "ai-recruiter-voice-agent": {
        "app": {
            "(main)": {
                "recruiter": {
                    "dashboard": {},
                    "create-interview": {},
                    "all-interview": {},
                    "billing": {},
                    "profile": {}
                },
                "candidate": {
                    "dashboard": {},
                    "interviews": {},
                    "profile": {}
                },
            },
            "interview": {
                "[interview_id]": {}
            },
            "admin": {},
            "api": {
                "ai-model": {},
                "ai-feedback": {},
                "admin": {}
            },
            "auth": {},
            "globals.css": "file"
        },
        "components": {
            "ui": {},
            "login-form.jsx": "file",
            "register-form.jsx": "file"
        },
        "context": {},
        "lib": {},
        "services": {
            "Constants.jsx": "file",
            "supabaseClient.js": "file"
        },
        "hooks": {},
        "public": {}
    }
}


def create_structure(base_path, struct):
    for name, content in struct.items():
        path = os.path.join(base_path, name)
        if content == "file":
            # Create an empty file
            with open(path, "w") as f:
                f.write("")  # placeholder empty file
            print(f"📄 Created file: {path}")
        else:
            # Create a directory
            os.makedirs(path, exist_ok=True)
            print(f"📂 Created folder: {path}")
            # Recurse into sub-structure
            create_structure(path, content)


if __name__ == "__main__":
    create_structure(".", structure)
    print("\n✅ Project structure created successfully!")
